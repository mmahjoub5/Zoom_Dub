package com.dubzoom.dubzoom.controller;

import org.springframework.context.event.EventListener;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

public class WebSocketEventListener {

    @EventListener
    private void handleSessionConnected(SessionConnectEvent event) {
        if(event != null) System.err.println("Connected");
    }

    @EventListener
    private void handleSessionDisconnect(SessionDisconnectEvent event) {
        if(event != null) System.err.println("Disconnected");
    }
}