package se.boxinator.api;

class BoxValidationError {
    public String property;
    public String error;

    public BoxValidationError(String property, String error) {
        this.property = property;
        this.error = error;
    }
}