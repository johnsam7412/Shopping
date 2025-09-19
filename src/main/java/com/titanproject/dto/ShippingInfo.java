package com.titanproject.dto;



public class ShippingInfo {

    private String name;
    private String email;
    private String mobile;
    private String address;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    // ✅ Normalize mobile number to E.164 format
    public void setMobile(String mobile) {
        if (mobile == null || mobile.trim().isEmpty()) {
            this.mobile = null;
            return;
        }

        mobile = mobile.trim();

        // If already starts with +, assume correct format
        if (mobile.startsWith("+")) {
            this.mobile = mobile;
        }
        // If 10 digits → assume India and add +91
        else if (mobile.matches("\\d{10}")) {
            this.mobile = "+91" + mobile;
        }
        // If starts with 0 and has 11 digits → remove 0 and add +91
        else if (mobile.matches("0\\d{10}")) {
            this.mobile = "+91" + mobile.substring(1);
        }
        else {
            throw new IllegalArgumentException("Invalid mobile number format: " + mobile);
        }
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
