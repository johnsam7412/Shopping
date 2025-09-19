package com.titanproject.dto;


import java.util.List;

public class OrderRequest {
	
    private String username;
    private ShippingInfo shipping;
    private Double total;
    private List<OrderItemRequest> items;

    // --- Getters & Setters ---
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public ShippingInfo getShipping() {
        return shipping;
    }
    public void setShipping(ShippingInfo shipping) {
        this.shipping = shipping;
    }

    public Double getTotal() {
        return total;
    }
    public void setTotal(Double total) {
        this.total = total;
    }

    public List<OrderItemRequest> getItems() {
        return items;
    }
    public void setItems(List<OrderItemRequest> items) {
        this.items = items;
    }
}
