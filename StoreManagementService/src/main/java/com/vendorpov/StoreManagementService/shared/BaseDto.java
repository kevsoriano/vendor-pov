package com.vendorpov.StoreManagementService.shared;

import java.io.Serializable;
import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonProperty;

public abstract class BaseDto implements Serializable {
	private static final long serialVersionUID = -496787152642605L;
//	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	private String id;
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	private Instant createdOn;
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	private Instant lastUpdatedOn;
//	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
//	private String createdBy;
//	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
//	private String lastModifiedBy;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

//	@JsonView(Views.Internal.class)
//	public String getCreatedBy() {
//		return createdBy;
//	}
//
//	public void setCreatedBy(String createdBy) {
//		this.createdBy = createdBy;
//	}
//
//	@JsonView(Views.Internal.class)
//	public String getLastModifiedBy() {
//		return lastModifiedBy;
//	}
//
//	public void setLastModifiedBy(String lastModifiedBy) {
//		this.lastModifiedBy = lastModifiedBy;
//	}

}
