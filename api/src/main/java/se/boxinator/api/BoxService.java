package se.boxinator.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;


// This kind of service...
// https://docs.microsoft.com/en-us/aspnet/mvc/overview/older-versions-1/models-data/validating-with-a-service-layer-cs

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

    // should probably be called Create instead...
    public BoxModel Insert(BoxModel box) throws Exception {
        BoxValidationErrors errors = Validate(box);

        if(errors.Exists()) {
            throw new Exception("invalid box");
        }

        box.shipping_cost = ComputeShippingCost(box);

        return db.Insert(box);
    }

    public List<BoxModel> All() throws Exception {
        return  db.All();
    }

    public BoxValidationErrors Validate(BoxModel box) {

        BoxValidationErrors errors = new BoxValidationErrors();

        // The validation here _SHOULD_ match the validation in ../web/reducers/newbox.js
        // implementing some of it to prove the point should suffice.

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

    public float ComputeShippingCost(BoxModel box) throws Exception {
        if(box == null) {
            throw new Exception("box == null");
        }

        String country = box.destination_country;
        if(!StringUtils.hasText(country)) {
            throw new Exception("missing destination_country value");
        }

        country = country.toLowerCase();
        Float multiplier = shippingCostMultipliers.get(country);
        if(multiplier == null) {
            throw new Exception("multiplier for " + country + " not found");
        }

        return box.weight * multiplier;
    }
}
