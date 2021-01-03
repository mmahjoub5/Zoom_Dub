//package com.dubzoom.dubzoom.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
//import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
//import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
//
//
//@Configuration
//@EnableWebSocketMessageBroker
//public class WebSocketBrokerConfig implements WebSocketMessageBrokerConfigurer {
//    @Override
//    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        // the endpoint for websocket connections
//        registry.addEndpoint("/stomp").setAllowedOrigins("*");
//    }
//}
