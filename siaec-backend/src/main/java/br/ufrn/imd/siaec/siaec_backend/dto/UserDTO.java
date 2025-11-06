package br.ufrn.imd.siaec.siaec_backend.dto;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonProperty;
import br.ufrn.imd.siaec.siaec_backend.enums.AccountStatusEnum;
import br.ufrn.imd.siaec.siaec_backend.enums.RoleEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String userId;

    private RoleEnum role;

    private String name;

    private String username;

    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String phone;

    private LocalDate dateOfBirth;

    private String taxId;

    private AccountStatusEnum statusAccount;
}
