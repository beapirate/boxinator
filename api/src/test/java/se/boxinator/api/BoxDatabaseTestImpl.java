package se.boxinator.api;

import java.util.ArrayList;
import java.util.List;

public class BoxDatabaseTestImpl implements BoxDatabaseInterface {

    public String ping() {
        return "pang";
    }

    public BoxModel Insert(BoxModel box) {
        return box;
    }

    public List<BoxModel> All() {
        return new ArrayList<>();
    }
}