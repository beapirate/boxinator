package se.boxinator.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class BoxDatabaseSqlImpl implements BoxDatabaseInterface {

    public String ping() {
        return "pong";
    }

    public BoxModel Insert(BoxModel box) {
        return box;
    }

    public List<BoxModel> All() {
        return new ArrayList<>();
    }
}