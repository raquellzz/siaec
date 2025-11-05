package br.ufrn.imd.siaec.siaec_backend.dto;

import java.util.Date;

import br.ufrn.imd.siaec.siaec_backend.enums.AccountStatusEnum;
import br.ufrn.imd.siaec.siaec_backend.enums.RoleEnum;

public class UserDTO {
    private String userId;
    private RoleEnum role;
    private String name;
    private String username;
    private String email;
    private String password;
    private String phone;
    private Date dateOfBirth;
    private String taxId;
    private AccountStatusEnum statusAccount;

    public UserDTO() {}

    public UserDTO(String userId, String role, String name, String username, String email,
            String password, String phone, Date dateOfBirth, String taxId, String statusAccount) {
        this.userId = userId;
        this.role = RoleEnum.valueOf(role);
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.taxId = taxId;
        this.statusAccount = AccountStatusEnum.valueOf(statusAccount);
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public RoleEnum getRole() {
        return role;
    }

    public void setRole(RoleEnum role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getTaxId() {
        return taxId;
    }

    public void setTaxId(String taxId) {
        this.taxId = taxId;
    }

    public AccountStatusEnum getStatusAccount() {
        return statusAccount;
    }

    public void setStatusAccount(AccountStatusEnum statusAccount) {
        this.statusAccount = statusAccount;
    }

}
