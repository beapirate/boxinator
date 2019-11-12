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


    @RequestMapping(value="/api/box", method=RequestMethod.GET, produces={"application/json"})
    public ResponseEntity<?> ListAll() {
        return ResponseEntity.ok().body(db.All());
    }


    @RequestMapping(value="/api/box", method=RequestMethod.POST, consumes={"application/json"})
    public ResponseEntity<?> Save(@RequestBody BoxModel box)  {

        BoxValidationErrors errors = db.Validate(box);

        if(errors.Exists()) {
            return ResponseEntity.badRequest().body(errors);
        }

        BoxModel created = db.Insert(box);

        // XXX - return object created by service (with box_id set)
        return ResponseEntity.status(201).body(created);
    }
}
