import React, { useState, useEffect } from 'react'
import { Container, Typography, Paper, Box, TextField, Button, AppBar, Toolbar, IconButton, Snackbar, ThemeProvider, createTheme, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/Delete'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import './styles/pixel-theme.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff69b4',
      light: '#ff8dc3',
      dark: '#c13b86',
    },
    secondary: {
      main: '#4a148c',
      light: '#7c43bd',
      dark: '#12005e',
    },
    background: {
      default: '#fce4ec',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Press Start 2P", cursive',
    h3: {
      fontWeight: 700,
      color: '#ff69b4',
      textShadow: '2px 2px 0 #4a148c',
      textAlign: 'center',
      marginBottom: '2rem',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          border: '4px solid #ff69b4',
          boxShadow: '4px 4px 0 rgba(74, 20, 140, 0.5)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Press Start 2P", cursive',
          border: '3px solid #ff69b4',
          boxShadow: '3px 3px 0 rgba(74, 20, 140, 0.5)',
          '&:hover': {
            transform: 'translate(-2px, -2px)',
            boxShadow: '5px 5px 0 rgba(74, 20, 140, 0.5)',
          },
          '&:active': {
            transform: 'translate(2px, 2px)',
            boxShadow: '1px 1px 0 rgba(74, 20, 140, 0.5)',
          },
        },
      },
    },
  },
})

const MessageBubble = ({ message, onDelete, isOwner }) => (
  <Paper
    className="pixel-bubble"
    sx={{
      p: 2,
      mb: 2,
      maxWidth: '80%',
      position: 'relative',
      animation: 'float 3s ease-in-out infinite',
      animationDelay: `${Math.random() * 2}s`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 2
    }}
  >
    <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
      {message}
    </Typography>
    {isOwner && (
      <IconButton
        onClick={onDelete}
        sx={{
          color: '#ff69b4',
          '&:hover': {
            color: '#ff8dc3',
            transform: 'scale(1.1)'
          }
        }}
      >
        <DeleteIcon />
      </IconButton>
    )}
  </Paper>
)

function MessageApp() {
  const [messages, setMessages] = useState([
    { id: 1, text: '想对主人说的话...', userId: 'system', deleted: false, originalText: '想对主人说的话...' },
    { id: 2, text: '想对奴隶说的话...', userId: 'system', deleted: false, originalText: '想对奴隶说的话...' },
    { id: 3, text: '想对玩伴说的话...', userId: 'system', deleted: false, originalText: '想对玩伴说的话...' },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [password, setPassword] = useState('')
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    // 从cookie获取用户ID，如果不存在则创建新的
    let id = document.cookie.match(/userId=([^;]+)/)?.[1]
    if (!id) {
      id = 'user_' + Math.random().toString(36).substr(2, 9)
      document.cookie = `userId=${id};path=/;max-age=31536000`
    }
    setUserId(id)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      // 检查用户24小时内的留言次数
      const checkMessageLimit = () => {
        const messageHistory = JSON.parse(localStorage.getItem(`messageHistory_${userId}`) || '[]')
        const now = Date.now()
        const oneDayAgo = now - 24 * 60 * 60 * 1000
        
        // 过滤出24小时内的留言
        const recentMessages = messageHistory.filter(time => time > oneDayAgo)
        
        if (recentMessages.length >= 3) {
          // 用户已达到24小时内3条留言的限制
          setSnackbarMessage('您已达到24小时内3条留言的限制，请稍后再试！')
          setSnackbarOpen(true)
          return false
        }
        
        // 更新留言历史
        recentMessages.push(now)
        localStorage.setItem(`messageHistory_${userId}`, JSON.stringify(recentMessages))
        return true
      }
      
      // 如果超过留言限制，则不继续处理
      if (!checkMessageLimit()) {
        return
      }
      
      // 过滤联系方式，但保留BDSM相关术语
      const bdsm_terms = ['dom', 'sub', 'master', 'slave', 'pet', 'switch', 'top', 'bottom']
      const filtered_message = newMessage.trim().replace(/\b(?!(?:${bdsm_terms.join('|')})\b)[a-zA-Z0-9]+(?:[-.s][a-zA-Z0-9]+)*\b/g, match => {
        // 检查是否包含数字和字母的组合，或纯数字/纯字母超过特定长度
        if (
          (/[0-9].*[a-zA-Z]|[a-zA-Z].*[0-9]/.test(match)) || // 数字字母混合
          (/^\d{6,}$/.test(match)) || // 纯数字且长度>=6
          (/^[a-zA-Z]{8,}$/.test(match)) // 纯字母且长度>=8
        ) {
          return '*'.repeat(match.length)
        }
        return match
      })
      const newMessageObj = {
        id: Date.now(),
        text: filtered_message,
        userId: userId,
        deleted: false,
        originalText: newMessage.trim()
      }
      setMessages([...messages, newMessageObj])
      setNewMessage('')
      setSnackbarMessage('留言成功！')
      setSnackbarOpen(true)
    }
  }

  const handleDelete = (index) => {
    const message = messages[index]
    if (!isAdmin && message.userId !== userId) {
      setSnackbarMessage('只能删除自己的留言！')
      setSnackbarOpen(true)
      return
    }
    const newMessages = [...messages]
    newMessages[index] = { ...message, deleted: true }
    setMessages(newMessages)
    setSnackbarMessage('删除成功！')
    setSnackbarOpen(true)
  }

  const handleLogin = () => {
    if (password === 'sangok33') {
      setIsAdmin(true)
      setOpenLogin(false)
      setPassword('')
      setSnackbarMessage('管理员登录成功！')
      setSnackbarOpen(true)
    } else {
      setSnackbarMessage('密码错误！')
      setSnackbarOpen(true)
    }
  }

  const handleLogout = () => {
    setIsAdmin(false)
    setSnackbarMessage('已退出管理员模式！')
    setSnackbarOpen(true)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: '#fff0f5',
            border: '4px solid #ff69b4',
            borderBottom: '4px solid #ff69b4',
            boxShadow: '4px 4px 0 rgba(255, 105, 180, 0.5)',
            mb: 3,
          }}
          className="pixel-theme-pink"
        >
          <Container maxWidth="lg">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Typography variant="h6" className="pixel-title-pink" sx={{ color: '#ff69b4' }}>
                留言板
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  color="inherit"
                  startIcon={isAdmin ? <LogoutIcon /> : <LoginIcon />}
                  onClick={isAdmin ? handleLogout : () => setOpenLogin(true)}
                  className="pixel-button-pink"
                  sx={{ color: '#ff69b4' }}
                >
                  {isAdmin ? '退出管理' : '管理员登录'}
                </Button>
                <Button
                  color="inherit"
                  startIcon={<HomeIcon />}
                  href="/index.html"
                  className="pixel-button-pink"
                  sx={{ color: '#ff69b4' }}
                >
                  返回首页
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Container maxWidth="md" sx={{ pb: 4, mb: 10 }}>
          <Typography variant="h3" className="pixel-title-pink">
            I Love Dirty Talk
          </Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: 2,
            alignItems: 'start'
          }}>
            {messages.map((message, index) => (
              (!message.deleted || isAdmin) && (
                <MessageBubble
                  key={index}
                  message={isAdmin ? message.originalText : message.text}
                  onDelete={() => handleDelete(index)}
                  isOwner={isAdmin || message.userId === userId}
                />
              )
            ))}
          </Box>
        </Container>
        
        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 2,
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            backgroundColor: '#fff0f5',
            zIndex: 1000,
            borderTop: '4px solid #ff69b4',
            boxShadow: '0 -4px 0 rgba(255, 105, 180, 0.5)'
          }}
          className="pixel-theme-pink"
        >
          <TextField
            fullWidth
            multiline
            rows={2}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="说点什么..."
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ff69b4',
                  borderWidth: '3px',
                },
                '&:hover fieldset': {
                  borderColor: '#ff69b4',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff69b4',
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              height: '100%',
              backgroundColor: '#ff69b4',
              color: 'white',
              '&:hover': {
                backgroundColor: '#ff8dc3',
              },
            }}
            className="pixel-button-pink"
          >
            发送
          </Button>
        </Paper>

        <style jsx global>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .pixel-bubble {
            background-color: #fff0f5 !important;
          }
        `}</style>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />

        <Dialog open={openLogin} onClose={() => setOpenLogin(false)}>
          <DialogTitle>管理员登录</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="密码"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenLogin(false)}>取消</Button>
            <Button onClick={handleLogin}>登录</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  )
}

export default MessageApp