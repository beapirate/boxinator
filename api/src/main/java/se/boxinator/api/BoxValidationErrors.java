package se.boxinator.api;

import java.util.ArrayList;
import java.util.List;

class BoxValidationErrors {
    public List<BoxValidationError> errors = new ArrayList<>();

    public void AddError(String property, String error) {
        this.errors.add(new BoxValidationError(property, error));
    }

    public boolean Exists() {
        return this.errors.size() > 0;
    }
}
