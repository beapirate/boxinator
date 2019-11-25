package se.boxinator.api;

import org.springframework.stereotype.Component;
import org.springframework.context.annotation.Profile;

import java.util.ArrayList;
import java.util.List;

@Component
@Profile("test")
public class BoxDatabaseTestImpl implements BoxDatabaseInterface {

    // mock database ops in Java once here so we don't have to do it in every single test
    // (it would be beneficial to mock/spy on this and return exact results per test for more complex queries)

    private int serial = 0;
    private List<BoxModel> boxes = new ArrayList<>();

    public String ping() {
        return "pang";
    }

    public BoxModel Insert(BoxModel box) {
        serial++;
        box.box_id = serial;
        this.boxes.add(box);
        return box;
    }

    public List<BoxModel> All() {
        return boxes;
    }
}