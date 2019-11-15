package se.boxinator.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class BoxService {

    private final BoxDatabaseInterface db;

    private Map<String, Float> shippingCostMultipliers = new HashMap<String, Float>() {{
        put("sweden", 1.3f);
        put("china", 4.0f);
        put("brazil", 8.6f);
        put("australia", 7.3f);
    }};


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
        List<BoxModel> all = db.All();
        for(BoxModel i : all) {
            i.shipping_cost = ComputeShippingCost(i);
        }
        return all;
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
        else if(!shippingCostMultipliers.containsKey(box.destination_country.toLowerCase())) {
            errors.AddError("destination_country", "invalid");
        }

        return errors;
    }

    public float ComputeShippingCost(BoxModel box) {
        return box.weight * shippingCostMultipliers.get(box.destination_country.toLowerCase());
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
