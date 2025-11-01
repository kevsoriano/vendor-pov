package com.vendorpov.User.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;

import javax.crypto.SecretKey;

import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthorizationFilter extends BasicAuthenticationFilter {
	private Environment env;

	public AuthorizationFilter(AuthenticationManager authenticationManager,
			Environment env) {
		super(authenticationManager);
		this.env = env;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest req, 
			HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
		String authorizationHeader = req.getHeader(env.getProperty("authorization.token.header.name"));
		
		if(authorizationHeader == null || !authorizationHeader.startsWith(env.getProperty("authorization.token.header.prefix"))) {
			chain.doFilter(req, res);
			return;
		}
		
		UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		chain.doFilter(req, res);
	}
	
	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest req) {
        String authorizationHeader = req.getHeader(env.getProperty("authorization.token.header.name"));

        if (authorizationHeader == null) {
            return null;
        }

        String token = authorizationHeader.replace(env.getProperty("authorization.token.header.prefix"), "").trim();
        String tokenSecret = env.getProperty("token.secret");
        
        if(tokenSecret==null) return null;

        byte[] secretKeyBytes = Base64.getEncoder().encode(tokenSecret.getBytes());
        SecretKey secretKey = Keys.hmacShaKeyFor(secretKeyBytes);

        JwtParser parser = Jwts.parser()
                .verifyWith(secretKey)
                .build();

        Claims claims = parser.parseSignedClaims(token).getPayload();
        String userId = (String) claims.get("sub");

        if (userId == null) {
            return null;
        }

        return new UsernamePasswordAuthenticationToken(userId, null, new ArrayList<>());

    }
}
