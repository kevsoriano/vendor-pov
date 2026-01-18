package com.vendorpov.User.data;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "addresses", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "type"}) // A user can only have 1 address of each type
})
public class AddressEntity extends BaseEntity {

	private static final long serialVersionUID = -5692113777587157381L;
	@Column(length = 15, nullable = false)
	private String city;
	@Column(length = 15, nullable = false)
	private String country;
	@Column(length = 100, nullable = false)
	private String addressLine1;
	@Column(length = 100, nullable = false)
	private String addressLine2;
	@Column(length = 6, nullable = false)
	private String postalCode;
	@Enumerated(EnumType.STRING) // Force Hibernate to use the name of the Enum
	@Column(columnDefinition = "VARCHAR(20) CHECK (type IN ('RESIDENTIAL', 'SHIPPING'))")
	private AddressType type;
	@ManyToOne(cascade = CascadeType.PERSIST) // Tells Hibernate: "If the user is new, save them too"
	@JoinColumn(name = "user_id")
	private UserEntity userDetails;
	@CreationTimestamp
	private Instant createdOn;
	@UpdateTimestamp
	private Instant lastUpdatedOn;

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getAddressLine1() {
		return addressLine1;
	}

	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}

	public String getAddressLine2() {
		return addressLine2;
	}

	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public AddressType getType() {
		return type;
	}

	public void setType(AddressType type) {
		this.type = type;
	}

	public UserEntity getUserDetails() {
		return userDetails;
	}

	public void setUserDetails(UserEntity userDetails) {
		this.userDetails = userDetails;
	}

	public Instant getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Instant createdOn) {
		this.createdOn = createdOn;
	}

	public Instant getLastUpdatedOn() {
		return lastUpdatedOn;
	}

	public void setLastUpdatedOn(Instant lastUpdatedOn) {
		this.lastUpdatedOn = lastUpdatedOn;
	}

}
