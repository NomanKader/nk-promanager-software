import React from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material';
import logo from '../../../assets/icons/logo.png'
import theme from '../../../theme';

function CustomerReviewComponent() {

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: isMobile ? "10px" : "20px",
      }}
    >
      <Typography
        variant='p'
        sx={{
          fontFamily: `'Amiko', 'Roboto', 'Instrument Sans', sans-serif`,
          fontWeight: 700,
          fontSize: isMobile ? "14px" : "18px", // Adjust font size for mobile
          textAlign: "center",
        }}
      >
        "Real Stories. Real Style. See what our customers are saying!"
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: isMobile ? "column" : "row", // Stack boxes on mobile
          marginTop: "40px",
          alignItems: isMobile ? "center" : "flex-start", // Center on mobile
          justifyContent: isMobile ? "center" : "space-evenly",
          gap: isMobile ? "20px" : "0", // Add spacing between boxes on mobile

        }}
      >
        <Box
          sx={{
            width: isMobile ? "90%" : "23%", // Full width on mobile
            padding: "20px",
            backgroundColor: theme.palette.secondary.backgroundColor,
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
            borderRadius: "15px",
            boxShadow: isMobile
              ? "4px 6px 18px 6px rgba(0,0,0,0.1)" // Lighter shadow on mobile
              : "8px 11px 34px 14px rgba(0,0,0,0.2)",
          }}
        >
          <Typography
            variant="p"
            sx={{
              fontFamily: `'Myanmar Text','Amiko', 'Roboto', 'Instrument Sans', sans-serif`,
              fontSize: isMobile ? "12px" : "16px", // Smaller font size for mobile
            }}
          >
            Local ထဲမှာဆိုရင် Candy & Peach ကို စိတ်တိုင်းအကျဆုံးပါပဲ အသားအိအိလေးတွေနဲ့ပေါ့ပေါ့ပါးပါးဝတ်ရတာအရမ်းအဆင်ပြေတယ် Customer Service ပိုင်းမှာလဲတကယ်ကိုစိတ်ကျေနပ်ရသောပါပဲ နောက်လဲအမြဲအားပေးသွားမှာပါချစ်စရာမွတ်နွတ်ပွတ်ကျွတ်လေးတွေအများကြီးထပ်ထုတ်ပေးပါဦး Heez
            100% Recommend ပါ
          </Typography>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
              }}
            />
            <p
              style={{
                margin: 0,
                fontSize: isMobile ? "8px" : "10px", // Adjust font size
                fontFamily: `'Amiko', 'Roboto', 'Instrument Sans', sans-serif`,
              }}
            >
              Candy & Peach Clothing
            </p>
          </Box>
        </Box>

        <Box
          sx={{
            width: isMobile ? "90%" : "23%", // Full width on mobile
            padding: "20px",
            backgroundColor: theme.palette.secondary.backgroundColor,
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
            borderRadius: "15px",
            boxShadow: isMobile
              ? "4px 6px 18px 6px rgba(0,0,0,0.1)" // Lighter shadow on mobile
              : "8px 11px 34px 14px rgba(0,0,0,0.2)",
          }}
        >
          <Typography
            variant="p"
            sx={{
              fontFamily: `'Myanmar Text','Amiko', 'Roboto', 'Instrument Sans', sans-serif`,
              fontSize: isMobile ? "12px" : "16px", // Smaller font size for mobile
            }}
          >
            ဒီ Pageလေးကိုစသိတဲ့အချိန်တုန်းက Followers အရမ်းမများခဲ့ဘူးအခုနောက်ပိုင်း 50k Likes နဲ့ Follower 54k ဆိုတော့အရမ်းဝမ်းသာမိပါတယ်မင်မင် Customerအပေါ်စေတနာထားလို့အောင်မြင်လာတာ
            မင်မင် ဒီထက်မကလည်းတိုးတက်ပါစေနော်  ထွက်သမျှ Itemတိုင်လည်းအရမ်းကြိုက်ပါတယ် အရမ်းလည်းဝယ်ချင်ခဲ့ပါတယ် မဖြစ်ဖြစ်အောင်ဝယ်မယ်ဆိူပြီး Skirt လေးနှစ်ထည် အားပေးဖူးပါတယ် Cutting အရမ်းမိုက်ပြီး အသားလေးလည်းအရမ်းကောင်းလို့ အရမ်းကြိုက်ရပါတယ်မင်မင်  ဒီထက်ပိုကောင်းတဲ့ ဒီဇိုင်းလေးတွေဖန်တီးနိုင်ပါစေနော်
          </Typography>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
              }}
            />
            <p
              style={{
                margin: 0,
                fontSize: isMobile ? "8px" : "10px", // Adjust font size
                fontFamily: `'Amiko', 'Roboto', 'Instrument Sans', sans-serif`,
              }}
            >
              Candy & Peach Clothing
            </p>
          </Box>
        </Box>

        <Box
          sx={{
            width: isMobile ? "90%" : "23%", // Full width on mobile
            padding: "20px",
            backgroundColor: theme.palette.secondary.backgroundColor,
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
            borderRadius: "15px",
            boxShadow: isMobile
              ? "4px 6px 18px 6px rgba(0,0,0,0.1)" // Lighter shadow on mobile
              : "8px 11px 34px 14px rgba(0,0,0,0.2)",
          }}
        >
          <Typography
            variant="p"
            sx={{
              fontFamily: `'Myanmar Text','Amiko', 'Roboto', 'Instrument Sans', sans-serif`,
              fontSize: isMobile ? "12px" : "16px", // Smaller font size for mobile
            }}
          >
            ရှေ့တစ်ပတ်ကမှလာပို့ထားတာ ဝတ်ရတာ အရမ်းအဆင်ပြေပါတယ် ပထမဆုံးမှာဖူးပြီးနောက်ထပ်လဲထပ်မှာဖို့တွေ ရှိပါတယ် စျေးသက်သက်သာသာလေးနဲ့ Design အသစ်အစမ်းလေးတွေအများကြီးထပ်ထုတ်နိုင်ပါစေ

          </Typography>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
              }}
            />
            <p
              style={{
                margin: 0,
                fontSize: isMobile ? "8px" : "10px", // Adjust font size
                fontFamily: `'Amiko', 'Roboto', 'Instrument Sans', sans-serif`,
              }}
            >
              Candy & Peach Clothing
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CustomerReviewComponent