package se.boxinator.api;

import java.util.List;

public interface BoxDatabaseInterface {

    public String ping();

    public BoxModel Insert(BoxModel box);

    public List<BoxModel> All();

}