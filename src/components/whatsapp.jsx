"use client";

import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function WhatsAppFloat({
  phoneNumber = "919975551431",
  accountName = "Life Cool Air Conditioner",
  statusMessage = "Typically replies within 10 mins",
  avatar = "/logo.png",
  chatMessage = "Hello! How can we help you?",
}) {
  return (
    <FloatingWhatsApp
      phoneNumber={phoneNumber}
      accountName={accountName}
      allowEsc
      notification
      notificationSound
      statusMessage={statusMessage}
      avatar={avatar}
      chatMessage={chatMessage}
    />
  );
}
