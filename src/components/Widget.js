import { UnlockIcon } from '@chakra-ui/icons';
import { Avatar, Box, Image } from '@chakra-ui/react';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import React from 'react'
import WhatsAppWidget from "react-whatsapp-chat-widget";

const Widget = () => {
    return (
        <Box position="fixed" style={{ bottom: 15, right: 15, cursor: "pointer" }}>
            <Image onClick={() => {
                window.open(`https://www.facebook.com/profile.php?id=100087279692478`);
            }}
                position="fixed" h="48px" w="48px" style={{ bottom: 70, right: 15 }} src='icons/facebook.svg' />
            <Image onClick={() => {
                window.open(`http://Instagram.com/andreahair_vietnam`);
            }} position="fixed" h="48px" w="48px" style={{ bottom: 125, right: 15 }} src='icons/instagram.svg' />
            <WhatsAppWidget
                phoneNo="84356737790"
                position="right"
                widgetWidth="300px"
                widgetWidthMobile="260px"
                messageBox={true}
                messageBoxTxt="Hi AndreaHair !"
                iconSize="48"
                iconColor="white"
                iconBgColor="#13c656"
                headerIcon="/logo/AndreaHair_logo.svg"
                headerIconColor="pink"
                headerTxtColor="white"
                headerBgColor="green"
                headerTitle="AndreaHair"
                headerCaption="Online"
                bodyBgColor="#bbb"
                chatPersonName="Support"
                chatMessage={<>Hi there 👋 <br /><br /> How can I help you?</>}
                footerBgColor="white"
                placeholder="Type a message.."
                btnBgColor="#13c656"
                btnTxt="Start Chat"
                btnTxtColor="white"
            />
        </Box>
    )
}

export default Widget