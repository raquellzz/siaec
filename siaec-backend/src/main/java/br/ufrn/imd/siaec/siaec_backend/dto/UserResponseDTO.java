package br.ufrn.imd.siaec.siaec_backend.dto;

import java.time.LocalDate;
import java.util.Date;

import br.ufrn.imd.siaec.siaec_backend.enums.AccountStatusEnum;
import br.ufrn.imd.siaec.siaec_backend.enums.RoleEnum;
import br.ufrn.imd.siaec.siaec_backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    private String userId;

    private String artisanId;

    private RoleEnum role;

    private String name;

    private String username;

    private String email;

    private String phone;

    private LocalDate dateOfBirth;

    private String taxId;

    private AccountStatusEnum statusAccount;
    
    private Date createdAt;

    private String description;

    public static UserResponseDTO fromEntity(User user) {
        return UserResponseDTO.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .username(user.getUsername())
                .email(user.getEmail())
                .phone(user.getPhone())
                .dateOfBirth(user.getDateOfBirth())
                .taxId(user.getTaxId())
                .role(user.getRole() instanceof RoleEnum ? user.getRole() : RoleEnum.valueOf(user.getRole().toString()))
                .statusAccount(user.getStatusAccount()) 
                .createdAt(user.getCreatedAt())
                .build();
    }
}
