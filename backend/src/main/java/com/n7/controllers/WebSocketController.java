package com.n7.controllers;

import com.n7.pojo.EnvRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void sendDataToClients(EnvRecord record) {
        messagingTemplate.convertAndSend("/topic/esp32", record);
    }
}


