package se.boxinator.api;

import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.*;

import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class BoxDatabaseTest {

    @Autowired
    private BoxDatabaseInterface db;

    @Test
    public void defaultEmptyTest() throws Exception {
        assertEquals(0, db.All().size());
    }

}