package com.vendorpov.Products.shared;

public class Views {
	// Basic fields (e.g., for lists)
    public interface Summary {}

    // Includes Summary fields + extra details (e.g., for profiles)
    public interface Internal extends Summary {}
}
