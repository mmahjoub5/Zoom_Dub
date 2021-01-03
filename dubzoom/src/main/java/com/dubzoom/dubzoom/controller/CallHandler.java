package com.dubzoom.dubzoom.controller;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
@EnableWebSocket
public class CallHandler implements WebSocketHandler {
    List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {

        for(WebSocketSession s : sessions) {
            if (s.isOpen() && !s.getId().equals(session.getId())) { //send to all other clients
                s.sendMessage(message);
            }
        }
    }

    @Override
    public void handleTransportError(WebSocketSession webSocketSession, Throwable throwable) throws Exception {

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        for(int i = 0; i < sessions.size(); i++) {
            if (sessions.get(i).isOpen() && !sessions.get(i).getId().equals(session.getId())) {
                sessions.remove(i);
            }
        }
        switch (closeStatus.getCode()) {
            case 1000:
                System.err.println("CLOSE_NORMAL");
                break;
            case 1001:
                System.err.println("CLOSE_GOING_AWAY");
                break;
            case 1002:
                System.err.println("CLOSE_PROTOCOL_ERROR");
                break;
            case 1003:
                System.err.println("CLOSE_UNSUPPORTED");
                break;
            case 1004:
                System.err.println("You're stupid");
                break;
            case 1005:
                System.err.println("CLOSED_NO_STATUS");
                break;
            case 1006:
                System.err.println("CLOSE_ABNORMAL");
                break;
            case 1007:
                System.err.println("Unsupported payload");
                break;
            case 1008:
                System.err.println("Policy violation");
                break;
            case 1009:
                System.err.println("CLOSE_TOO_LARGE");
                break;
            case 1010:
                System.err.println("Mandatory extension");
                break;
            case 1011:
                System.err.println("Server error");
                break;
            case 1012:
                System.err.println("Service restart");
                break;
            case 1013:
                System.err.println("Try again later");
                break;
            case 1014:
                System.err.println("Bad gateway");
                break;
            case 1015:
                System.err.println("TLS handshake fail");
                break;
        }
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
