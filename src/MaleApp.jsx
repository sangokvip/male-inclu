import React, { useState, useRef } from 'react'
import { Container, Typography, Paper, Grid, Box, Select, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Snackbar, AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, createTheme, ThemeProvider } from '@mui/material'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import html2canvas from 'html2canvas'
import html2pdf from 'html2pdf.js'
import ScienceIcon from '@mui/icons-material/Science'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import HelpIcon from '@mui/icons-material/Help'
import MenuIcon from '@mui/icons-material/Menu'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import CloseIcon from '@mui/icons-material/Close'
import AssessmentIcon from '@mui/icons-material/Assessment'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'

const RATING_OPTIONS = ['SSS', 'SS', 'S', 'Q', 'N', 'W']
const CATEGORIES = {
  '👑 性奴': ['🔞 强奸', '👥 轮奸', '💋 口爆', '💦 颜射', '💉 内射', '🍑 肛交', '🔧 器具折磨', '⚡️ 强制高潮', '💧 潮吹失禁', '🎭 自慰展示', '🚫 禁止高潮', '🔄 扩张阴道', '⭕️ 扩张肛门', '🔄 双阳具插入', '➕ 多阳具插入', '✌️ 双插'],
  '🐕 犬奴': ['🔒 囚笼关押', '⛓️ 项圈镣铐', '🍽️ 喂食', '🐾 爬行', '👣 舔足', '👠 踩踏', '🎠 骑乘'],
  '🎎 玩偶奴': ['🎭 角色扮演', '👔 制服诱惑', '🎭 人偶装扮', '💍 乳环', '💎 阴环', '💫 脐环', '✂️ 剃毛', '🔍 内窥镜研究', '🔧 性工具研究', '🎨 作为艺术品', '🪑 作为家具', '🚬 作为烟灰缸', '👗 作为女仆', '🤐 限制说话内容'],
  '🌲 野奴': ['🌳 野外暴露', '⛓️ 野外奴役', '🏃‍♀️ 野外流放', '🌿 野外玩弄', '🏢 公共场合暴露', '🏛️ 公共场合玩弄', '🎗️ 公开场合捆绑（衣服内）', '📱 公开场合器具（衣服内）', '👀 露阴（像朋友）', '👥 露阴（向生人）', '🔐 贞操带', '📿 公开场合项圈'],
  '🐾 兽奴': ['🐕 兽交', '🐺 群兽轮交', '🐎 人兽同交', '🦁 兽虐', '🐜 昆虫爬身'],
  '⚔️ 刑奴': ['👋 耳光', '🤐 口塞', '💇‍♀️ 扯头发', '👢 皮带', '🎯 鞭子', '🎋 藤条', '🪵 木板', '🏏 棍棒', '🖌️ 毛刷', '⚡️ 虐阴', '🔗 紧缚', '⛓️ 吊缚', '🔒 拘束', '📎 乳夹', '⚡️ 电击', '🕯️ 滴蜡', '📍 针刺', '💉 穿孔', '🔥 烙印', '🎨 刺青', '✂️ 切割', '🔥 火刑', '💧 水刑', '😮‍💨 窒息', '👊 体罚', '🧊 冰块'],
  '🚽 厕奴': ['👅 舔精', '🥛 吞精', '💧 唾液', '💦 喝尿', '🚿 尿浴', '👄 舔阴', '💦 放尿', '🚰 灌肠', '👅 舔肛', '💩 排便', '🛁 粪浴', '🍽️ 吃粪', '🤧 吃痰', '🩸 吃经血'],
  '💭 心奴': ['🗣️ 言语侮辱', '😈 人格侮辱', '🧠 思维控制', '🌐 网络控制', '📢 语言管教'],
  '✨ 其他': ['👥 多奴调教', '👑 多主调教', '🌐 网络公调', '🪶 瘙痒', '📅 长期圈养', '⏱️ 短期圈养', '😴 剥夺睡眠', '🌀 催眠', '👭 同性性爱']
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D47A1',
      light: '#1976D2',
      dark: '#002171',
    },
    secondary: {
      main: '#1E88E5',
      light: '#42A5F5',
      dark: '#1565C0',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0D47A1',
      secondary: '#1976D2',
    },
  },
  typography: {
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
      color: '#0D47A1',
      marginBottom: '2rem',
      fontSize: '2.5rem',
    },
    subtitle1: {
      color: '#1976D2',
      fontSize: '1.2rem',
      lineHeight: 1.8,
      marginBottom: '2.5rem',
    },
    h5: {
      fontWeight: 600,
      color: '#0D47A1',
      marginBottom: '1.5rem',
      fontSize: '1.8rem',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 10px 20px rgba(13, 71, 161, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          padding: '2rem',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 15px 30px rgba(13, 71, 161, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 28px',
          fontSize: '1.1rem',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 16px rgba(13, 71, 161, 0.2)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #0D47A1 30%, #1976D2 90%)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(45deg, #002171 30%, #0D47A1 90%)',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundColor: '#FFFFFF',
          fontSize: '1.1rem',
          padding: '12px',
          '&:hover': {
            backgroundColor: '#F5F7FA',
          },
        },
      },
    },
  },
})

function MaleApp() {
  const [ratings, setRatings] = useState({})
  const [openReport, setOpenReport] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedBatchRating, setSelectedBatchRating] = useState('')
  const reportRef = useRef(null)

  const handleRatingChange = (category, item, value) => {
    setRatings(prev => ({
      ...prev,
      [`${category}-${item}`]: value
    }))
  }

  const getRating = (category, item) => {
    return ratings[`${category}-${item}`] || ''
  }

  const getRatingColor = (rating) => {
    switch(rating) {
      case 'SSS': return '#E91E63' // 粉色
      case 'SS': return '#9C27B0'  // 紫色
      case 'S': return '#4CAF50'   // 绿色
      case 'Q': return '#FFA000'   // 琥珀色
      case 'N': return '#FF5722'   // 橙红色
      case 'W': return '#757575'   // 深灰色
      default: return '#F5F5F5'    // 浅灰色背景
    }
  }

  const getRadarData = () => {
    return Object.entries(CATEGORIES).map(([category]) => {
      const items = CATEGORIES[category]
      const categoryScores = items.map(item => {
        const rating = getRating(category, item)
        switch(rating) {
          case 'SSS': return 6
          case 'SS': return 5
          case 'S': return 4
          case 'Q': return 3
          case 'N': return 2
          case 'W': return 1
          default: return 0
        }
      })
      const avgScore = categoryScores.reduce((a, b) => a + b, 0) / items.length
      return {
        category,
        value: avgScore,
        fullMark: 6
      }
    })
  }

  const getBarData = (category) => {
    return CATEGORIES[category].map(item => ({
      name: item,
      value: (() => {
        const rating = getRating(category, item)
        switch(rating) {
          case 'SSS': return 6
          case 'SS': return 5
          case 'S': return 4
          case 'Q': return 3
          case 'N': return 2
          case 'W': return 1
          default: return 0
        }
      })()
    }))
  }

  const handleExportImage = async () => {
    if (reportRef.current) {
      try {
        const reportElement = reportRef.current;
        
        // 创建一个新的容器元素
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '-9999px';
        container.style.width = '1200px'; // 固定宽度以确保一致的布局
        container.style.backgroundColor = '#ffffff';
        document.body.appendChild(container);

        // 克隆报告元素
        const clonedReport = reportElement.cloneNode(true);
        container.appendChild(clonedReport);

        // 修改导出图片的网格布局为每行3列
        const optionsGrids = clonedReport.querySelectorAll('.options-grid');
        optionsGrids.forEach(grid => {
          grid.style.display = 'grid';
          grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
          grid.style.gap = '1rem';
          grid.style.width = '100%';
          grid.style.margin = '0 auto';
          // 确保每个选项有足够的空间
          const optionItems = grid.querySelectorAll('.option-item');
          optionItems.forEach(item => {
            item.style.minWidth = '0';
            item.style.flexWrap = 'nowrap';
            item.style.overflow = 'hidden';
            item.style.fontSize = '1.8em';
            // 增大评分等级说明的字体
            const ratingText = item.querySelector('.rating-text');
            if (ratingText) {
              ratingText.style.fontSize = '1.6em';
            }
          });
        });

        // 预处理克隆的元素
        const dialogElement = clonedReport.querySelector('[role="dialog"]');
        if (dialogElement) {
          dialogElement.style.position = 'relative';
          dialogElement.style.transform = 'none';
          dialogElement.style.top = '0';
          dialogElement.style.left = '0';
          dialogElement.style.width = '100%';
          dialogElement.style.height = 'auto';
          dialogElement.style.maxHeight = 'none';
          dialogElement.style.overflow = 'visible';
          dialogElement.style.display = 'block';
          dialogElement.style.margin = '0';
          dialogElement.style.padding = '2rem';
          dialogElement.style.boxSizing = 'border-box';

          // 增大标题字体
          const titles = dialogElement.querySelectorAll('.section-title');
          titles.forEach(title => {
            title.style.fontSize = '2.2em';
          });

          // 增大图表字体
          const charts = dialogElement.querySelectorAll('.recharts-text');
          charts.forEach(text => {
            text.style.fontSize = '1.6em';
          });
        }

        // 确保所有图表都已渲染
        await new Promise(resolve => setTimeout(resolve, 500));

        // 预加载二维码图片并设置属性
        await new Promise((resolve) => {
          const qrCodeImg = reportElement.querySelector('img[alt="QR Code"]');
          if (qrCodeImg) {
            qrCodeImg.crossOrigin = 'anonymous';
            qrCodeImg.style.position = 'absolute';
            qrCodeImg.style.bottom = '20px';
            qrCodeImg.style.right = '20px';
            qrCodeImg.style.width = '120px';
            qrCodeImg.style.height = '120px';
            qrCodeImg.style.borderRadius = '12px';
            qrCodeImg.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            qrCodeImg.style.zIndex = '1000';
            qrCodeImg.style.backgroundColor = '#ffffff';
            qrCodeImg.style.objectFit = 'contain';
            qrCodeImg.style.display = 'block';
            
            const newImg = new Image();
            newImg.crossOrigin = 'anonymous';
            newImg.onload = () => {
              qrCodeImg.src = newImg.src;
              resolve();
            };
            newImg.onerror = resolve;
            newImg.src = qrCodeImg.src;
          } else {
            resolve();
          }
        });

        const canvas = await html2canvas(container, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
          imageTimeout: 30000,
          onclone: (clonedDoc) => {
            const charts = clonedDoc.querySelectorAll('.recharts-wrapper');
            charts.forEach(chart => {
              chart.style.width = '100%';
              chart.style.height = 'auto';
            });
            // 确保二维码图片正确显示
            const qrCodeImg = clonedDoc.querySelector('img[alt="QR Code"]');
            if (qrCodeImg) {
              qrCodeImg.crossOrigin = 'anonymous';
              qrCodeImg.style.position = 'absolute';
              qrCodeImg.style.bottom = '20px';
              qrCodeImg.style.right = '20px';
              qrCodeImg.style.width = '120px';
              qrCodeImg.style.height = '120px';
              qrCodeImg.style.borderRadius = '12px';
              qrCodeImg.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
              qrCodeImg.style.zIndex = '1000';
              qrCodeImg.style.backgroundColor = '#ffffff';
              qrCodeImg.style.objectFit = 'contain';
              qrCodeImg.style.display = 'block';
            }
          }
        });

        // 清理临时元素
        document.body.removeChild(container);

        // 将Canvas转换为Blob对象
        const blob = await new Promise(resolve => {
          canvas.toBlob(resolve, 'image/png', 1.0)
        })

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

        if (isMobile) {
          try {
            // 尝试使用Web Share API
            if (navigator.share && navigator.canShare) {
              const file = new File([blob], '男M自评报告.png', { type: 'image/png' })
              const shareData = { files: [file] }
              
              if (navigator.canShare(shareData)) {
                await navigator.share(shareData)
                setSnackbarMessage('图片已准备好分享！')
                setSnackbarOpen(true)
                return
              }
            }

            // 如果Web Share API不可用，尝试使用FileSaver API
            if ('saveAs' in navigator) {
              await navigator.saveAs(blob, '男M自评报告.png')
              setSnackbarMessage('报告已保存到相册！')
              setSnackbarOpen(true)
              return
            }

            // 回退方案：使用传统的下载方法
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = '男M自评报告.png'
            link.style.display = 'none'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
            setSnackbarMessage('报告已保存为高清图片！')
            setSnackbarOpen(true)
          } catch (error) {
            console.error('保存图片错误:', error)
            setSnackbarMessage('保存图片失败，请尝试使用系统自带的截图功能')
            setSnackbarOpen(true)
          }
        } else {
          // 桌面端使用传统下载方法
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = '男M自评报告.png'
          link.click()
          URL.revokeObjectURL(url)
          setSnackbarMessage('报告已保存为高清图片！')
          setSnackbarOpen(true)
        }
      } catch (error) {
        console.error('导出图片错误:', error)
        setSnackbarMessage('导出图片失败，请重试')
        setSnackbarOpen(true)
      }
    }
  }

  const handleExportPDF = async () => {
    if (reportRef.current) {
      try {
        const element = reportRef.current
        const opt = {
          margin: 1,
          filename: '男M自评报告.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        }
        await html2pdf().set(opt).from(element).save()
        setSnackbarMessage('报告已成功保存为PDF！')
        setSnackbarOpen(true)
      } catch (error) {
        setSnackbarMessage('导出PDF失败，请重试')
        setSnackbarOpen(true)
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box component="img" src="https://img.m-profile.top/img/qrcode.png" alt="QR Code" sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: { xs: '100px', sm: '120px' },
        height: { xs: '100px', sm: '120px' },
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 1000,
        '&:hover': {
          transform: 'scale(1.05)'
        }
      }} />

      <AppBar position="sticky" sx={{
        background: 'linear-gradient(135deg, #6200ea 0%, #9d46ff 100%)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>

        <Container maxWidth="lg">
          <Toolbar sx={{ 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: { xs: '8px 16px', md: '8px 24px' },
            minHeight: { xs: '56px', md: '64px' }
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 1,
              flex: '1 1 auto',
              justifyContent: 'flex-start',
              height: '100%'
            }}>
              <ScienceIcon sx={{ display: 'flex' }} />
              <Typography variant="h5" sx={{
                fontWeight: 'bold',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                margin: 0,
                padding: 0,
                lineHeight: 1,
                height: '100%'
              }}>
                M-Profile Lab
              </Typography>
            </Box>
                
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              gap: 2,
              flex: '1 1 auto',
              justifyContent: 'flex-end'
            }}>              
              <Button color="inherit" startIcon={<HomeIcon />}>首页</Button>
              <Button color="inherit" startIcon={<InfoIcon />}>关于</Button>
              <Button color="inherit" startIcon={<HelpIcon />}>帮助</Button>
              <Button color="inherit" startIcon={<MaleIcon />} href="/male.html">男性版</Button>
              <Button color="inherit" startIcon={<FemaleIcon />} href="/female.html">女性版</Button>
            </Box>

            <IconButton
              color="inherit"
              sx={{ display: { xs: 'block', md: 'none' } }}
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #E3F2FD 0%, #BBDEFB 100%)',
      }}>
  

        <Drawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <Box sx={{ width: 250, p: 2 }}>
            <List>
              <ListItem button>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="首页" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><InfoIcon /></ListItemIcon>
                <ListItemText primary="关于" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><HelpIcon /></ListItemIcon>
                <ListItemText primary="帮助" />
              </ListItem>
              <ListItem button component="a" href="/male.html">
                <ListItemIcon><MaleIcon /></ListItemIcon>
                <ListItemText primary="男性版" />
              </ListItem>
              <ListItem button component="a" href="/female.html">
                <ListItemIcon><FemaleIcon /></ListItemIcon>
                <ListItemText primary="女性版" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" gutterBottom sx={{
              background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              letterSpacing: '0.5px'
            }}>
              男M自评报告
            </Typography>
            <Typography variant="subtitle1" sx={{
              maxWidth: 600,
              mx: 'auto',
              color: '#3F51B5',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              fontWeight: 500
            }}>
              这是一个专业的男性M倾向评估工具，请根据您的真实想法进行选择。
            </Typography>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<AutorenewIcon />}
                sx={{
                  background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                  color: 'white',
                  padding: '14px 36px',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #2196F3 30%, #1976D2 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(25, 118, 210, 0.3)'
                  }
                }}
                onClick={() => {
                  const newRatings = {};
                  Object.entries(CATEGORIES).forEach(([category, items]) => {
                    items.forEach(item => {
                      const randomIndex = Math.floor(Math.random() * RATING_OPTIONS.length);
                      newRatings[`${category}-${item}`] = RATING_OPTIONS[randomIndex];
                    });
                  });
                  setRatings(newRatings);
                  setSnackbarMessage('已完成随机选择！');
                  setSnackbarOpen(true);
                }}
              >
                随机选择
              </Button>
            </Box>
          </Box>

          <Grid container spacing={4}>
            {Object.entries(CATEGORIES).map(([category, items]) => (
              <Grid item xs={12} md={6} key={category}>
                <Paper sx={{
                  p: 4,
                  background: 'linear-gradient(to bottom right, #FFFFFF 0%, #F8F9FA 100%)',
                  border: '1px solid rgba(25, 118, 210, 0.1)',
                  boxShadow: '0 8px 16px rgba(25, 118, 210, 0.1)',
                  '&:hover': {
                    boxShadow: '0 12px 24px rgba(25, 118, 210, 0.15)'
                  }
                }}>
                  <Typography variant="h5" gutterBottom sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: '#1976D2',
                    fontWeight: 600,
                    letterSpacing: '0.5px'
                  }}>
                    {category}
                    <Select
                      size="small"
                      value={selectedBatchRating}
                      onChange={(e) => {
                        const items = CATEGORIES[category];
                        const newRatings = { ...ratings };
                        items.forEach(item => {
                          newRatings[`${category}-${item}`] = e.target.value;
                        });
                        setRatings(newRatings);
                        setSnackbarMessage(`已将${category}类别下所有选项设置为${e.target.value}`);
                        setSnackbarOpen(true);
                        setSelectedBatchRating('');
                      }}
                      displayEmpty
                      placeholder="一键选择"
                      renderValue={(value) => value || "一键选择"}
                      sx={{ ml: 2, minWidth: 100 }}
                    >
                      <MenuItem value="">-</MenuItem>
                      {RATING_OPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </Typography>
                  <Grid container spacing={2}>
                    {items.map((item) => (
                      <Grid item xs={12} sm={6} key={item}>
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}>
                          <Typography variant="body2" sx={{ flex: 1 }}>
                            {item}
                          </Typography>
                          <Select
                            value={getRating(category, item)}
                            onChange={(e) => handleRatingChange(category, item, e.target.value)}
                            size="small"
                            sx={{
                              minWidth: 120,
                              backgroundColor: getRatingColor(getRating(category, item)),
                              borderRadius: '8px',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(25, 118, 210, 0.2)'
                              },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(25, 118, 210, 0.4)'
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1976D2'
                              },
                              transition: 'all 0.2s ease-in-out',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 8px rgba(25, 118, 210, 0.15)'
                              }
                            }}
                          >
                            <MenuItem value="">-</MenuItem>
                            {RATING_OPTIONS.map((option) => (
                              <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                          </Select>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => setOpenReport(true)}
              startIcon={<AssessmentIcon />}
            >
              生成报告
            </Button>
          </Box>
        </Container>

        <Dialog
          open={openReport}
          onClose={() => setOpenReport(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              maxHeight: '90vh',
              overflowY: 'auto',
              '@media print': {
                maxHeight: 'none',
                overflow: 'visible'
              }
            }
          }}
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">评测报告</Typography>
              <IconButton onClick={() => setOpenReport(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers ref={reportRef}>
            <Box sx={{ p: 4, backgroundColor: '#FFFFFF' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <Box component="img" src="https://img.m-profile.top/img/qrcode.png" alt="QR Code" sx={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  marginBottom: '20px'
                }} />
              </Box>
              <Typography variant="h4" gutterBottom align="center" sx={{
                background: 'linear-gradient(45deg, #0D47A1 30%, #1976D2 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900,
                letterSpacing: '2px',
                marginBottom: '3rem',
                fontSize: '3rem',
                textShadow: '0 2px 4px rgba(13, 71, 161, 0.1)',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #0D47A1, #1976D2)',
                  borderRadius: '2px'
                }
              }}>
                男M倾向分析报告
              </Typography>
              <Box sx={{ mb: 8, display: 'flex', justifyContent: 'center' }}>
                <RadarChart width={700} height={500} data={getRadarData()} style={{ margin: '0 auto' }}>
                  <PolarGrid stroke="#1976D2" strokeWidth={1} />
                  <PolarAngleAxis dataKey="category" tick={{ fill: '#0D47A1', fontSize: 16, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 6]} tick={{ fill: '#1976D2' }} />
                  <Radar name="评分" dataKey="value" stroke="#0D47A1" fill="#1976D2" fillOpacity={0.4} strokeWidth={2} />
                </RadarChart>
              </Box>
              <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {Object.entries(CATEGORIES).map(([category, items]) => {
                  // 按评分对项目进行分组
                  const groupedItems = items.reduce((acc, item) => {
                    const rating = getRating(category, item);
                    if (!acc[rating]) acc[rating] = [];
                    acc[rating].push(item);
                    return acc;
                  }, {});

                  return (
                    <Box key={category} sx={{ backgroundColor: '#F8F9FA', borderRadius: '16px', p: 3, mb: 4 }}>
                      <Typography variant="h5" gutterBottom sx={{
                        color: '#1565C0',
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        '&::before': {
                          content: '""',
                          width: '4px',
                          height: '24px',
                          backgroundColor: '#1976D2',
                          marginRight: '12px',
                          borderRadius: '2px'
                        }
                      }}>
                        {category}
                      </Typography>
                      {RATING_OPTIONS.map(rating => {
                        const items = groupedItems[rating] || [];
                        if (items.length === 0) return null;

                        return (
                          <Box key={rating} sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{
                              color: '#1976D2',
                              fontSize: '1.2rem',
                              fontWeight: 600,
                              mb: 2,
                              pl: 2,
                              borderLeft: `4px solid ${getRatingColor(rating)}`
                            }}>
                              {rating}
                            </Typography>
                            <Grid container spacing={1}>
                              {items.map((item) => (
                                <Grid item xs={6} sm={4} md={3} key={item}>
                                  <Paper
                                    elevation={2}
                                    sx={{
                                      p: 1.5,
                                      backgroundColor: getRatingColor(rating),
                                      borderRadius: '8px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      minHeight: '40px',
                                      transition: 'all 0.2s ease',
                                      '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 8px rgba(13, 71, 161, 0.15)'
                                      }
                                    }}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        fontSize: '0.9rem',
                                        fontWeight: 500,
                                        color: rating ? '#0D47A1' : '#1976D2',
                                        textAlign: 'center'
                                      }}
                                    >
                                      {item}
                                    </Typography>
                                  </Paper>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        );
                      })}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleExportImage} startIcon={<AssessmentIcon />}>
              保存为图片
            </Button>
            <Button onClick={handleExportPDF} startIcon={<AssessmentIcon />}>
              导出PDF
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </Box>
    </ThemeProvider>
  )
}

export default MaleApp