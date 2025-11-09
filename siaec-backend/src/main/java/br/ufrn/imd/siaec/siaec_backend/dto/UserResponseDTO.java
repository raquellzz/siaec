package br.ufrn.imd.siaec.siaec_backend.dto;

import java.time.LocalDate;
import br.ufrn.imd.siaec.siaec_backend.enums.RoleEnum;
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

    private RoleEnum role;

    private String name;

    private String username;

    private String email;

    private String phone;

    private LocalDate dateOfBirth;

    private String taxId;
}
