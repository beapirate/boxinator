package se.boxinator.api;

import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


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


@RestController
public class BoxController {

    private final BoxService db;

    public BoxController(BoxService db) {
        this.db = db;
    }

    @RequestMapping(value="/api/ping", method=RequestMethod.GET)
    public ResponseEntity<?> Ping() {
        return ResponseEntity.ok().body(db.ping());
    }

    @RequestMapping(value="/api/box", method=RequestMethod.POST, consumes={"application/json"})
    public ResponseEntity<?> Save(@RequestBody BoxModel box)  {
        BoxValidationErrors errors = new BoxValidationErrors();

        // XXX - move this business logic out of here...
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


        if(errors.Exists()) {
            return ResponseEntity.badRequest().body(errors);
        }

        BoxModel created = db.Insert(box);

        // XXX - return object created by service (with box_id set)
        return ResponseEntity.status(201).body(created);
    }
}
