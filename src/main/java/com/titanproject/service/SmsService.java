package com.titanproject.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class SmsService {
	
	@Value("${twilio.account_sid}")
    private String accountSid;
    @Value("${twilio.auth_token}")
    private String authToken;
    @Value("${twilio.trial_number}")
    private String fromNumber ="+14043417638";

    public void sendSms(String to, String body) {
        Twilio.init(accountSid, authToken);
        Message.creator(
                new com.twilio.type.PhoneNumber(to),
                new com.twilio.type.PhoneNumber(fromNumber),
                body
        ).create();
    }
}
