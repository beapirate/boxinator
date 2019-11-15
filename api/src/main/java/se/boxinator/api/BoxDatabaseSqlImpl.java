package se.boxinator.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;


@Component
@Profile("!test")
public class BoxDatabaseSqlImpl implements BoxDatabaseInterface {

    private JdbcTemplate jdbc;

    public BoxDatabaseSqlImpl(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public String ping() {
        return "pong";
    }

    public BoxModel Insert(BoxModel box) {
        jdbc.update(
            "INSERT INTO boxes (recipient_name, box_weight, color, destination_country) VALUES (?, ?, ?, ?)",
            box.recipient_name, box.weight, box.color, box.destination_country);
        return box;
    }

    public List<BoxModel> All() {
        return jdbc.query("SELECT * FROM boxes", new BoxRowMapper());
    }
}

class BoxRowMapper implements RowMapper<BoxModel> {

    @Override
    public BoxModel mapRow(ResultSet rs, int rowNum) throws SQLException {
        BoxModel box = new BoxModel();
        box.box_id = rs.getInt("box_id");
        box.recipient_name = rs.getString("recipient_name");
        box.weight = rs.getFloat("box_weight");
        box.color = rs.getString("color");
        box.destination_country = rs.getString("destination_country");
        return box;
    }
}