package com.titanproject.dto;

	
public class OrderItemRequest {
	    private Long productId;
	    private String name;
	    private Double price;
	    private Integer qty;
	    private String img;

	    // --- Getters & Setters ---
	    public Long getProductId() {
	        return productId;
	    }
	    public void setProductId(Long productId) {
	        this.productId = productId;
	    }

	    public String getName() {
	        return name;
	    }
	    public void setName(String name) {
	        this.name = name;
	    }

	    public Double getPrice() {
	        return price;
	    }
	    public void setPrice(Double price) {
	        this.price = price;
	    }

	    public Integer getQty() {
	        return qty;
	    }
	    public void setQty(Integer qty) {
	        this.qty = qty;
	    }

	    public String getImg() {
	        return img;
	    }
	    public void setImg(String img) {
	        this.img = img;
	    }
	    
	    
	}

