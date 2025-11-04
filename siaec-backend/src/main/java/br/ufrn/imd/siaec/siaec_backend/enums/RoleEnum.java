package br.ufrn.imd.siaec.siaec_backend.enums;

public enum RoleEnum {
    ADMIN("admin"),
    CURATOR("curator"),
    ARTISAN("artisan"),
    CLIENT("client"),
    DELIVERY_PERSON("delivery_person"),
    CERIMONIALIST("cerimonialist");

    private String text;

    RoleEnum(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
}
