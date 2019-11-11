package se.boxinator.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class BoxService {

    private final BoxDatabaseInterface db;

    public BoxService(BoxDatabaseInterface db) {
        this.db = db;
    }


    public String ping() {
        return db.ping();
    }

    public BoxModel Insert(BoxModel box) {
        return db.Insert(box);

    }

    public List<BoxModel> All() {
        return db.All();
    }

}