package se.boxinator.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class BoxService {

    private final BoxDatabaseInterface db;

    public BoxService(BoxDatabaseInterface db) {
        this.db = db;
    }


    public String ping() {
        return db.ping();
    }

    public BoxModel Insert(BoxModel box) throws Exception {
        BoxValidationErrors errors = Validate(box);

        if(errors.Exists()) {
            throw new Exception("invalid box");
        }

        return db.Insert(box);

    }

    public List<BoxModel> All() {
        return db.All();
    }

    public BoxValidationErrors Validate(BoxModel box) {

        BoxValidationErrors errors = new BoxValidationErrors();

        // The validation here _SHOULD_ matche the validation in ../web/reducers/newbox.js

        if(box.box_id >= 0) {
            errors.AddError("box_id", "box_id property not allowed when creating a new box");
        }

        if(!StringUtils.hasText(box.recipient_name)) {
            errors.AddError("recipient_name", "empty");
        }

        if(!(box.weight > 0)) {
            errors.AddError("weight", "empty");
        }

        if(!StringUtils.hasText(box.color)) {
            errors.AddError("color", "empty");
        }

        if(!StringUtils.hasText(box.destination_country)) {
            errors.AddError("destination_country", "empty");
        }

        return errors;
    }
}

class BoxError {
    public String property;
    public String error;

    public BoxError(String property, String error) {
        this.property = property;
        this.error = error;
    }
}

class BoxValidationErrors {
    public List<BoxError> errors = new ArrayList<>();

    public void AddError(String property, String error) {
        this.errors.add(new BoxError(property, error));
    }

    public boolean Exists() {
        return this.errors.size() > 0;
    }
}
