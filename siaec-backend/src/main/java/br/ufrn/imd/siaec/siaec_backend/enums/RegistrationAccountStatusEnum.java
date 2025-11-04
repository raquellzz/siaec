package br.ufrn.imd.siaec.siaec_backend.enums;

public enum RegistrationAccountStatusEnum {
    APPROVED("approved"),
    DENIED("denied"),
    UNDER_REVIEW("under_review");

    private String text;

    RegistrationAccountStatusEnum(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
}
