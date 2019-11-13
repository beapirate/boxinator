package se.boxinator.api;

import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.*;

import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.boot.test.mock.mockito.SpyBean;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class BoxServiceTest {

    @SpyBean
    private BoxDatabaseInterface dbMock;

    @Autowired
    private BoxService service;

    @Test
    public void defaultEmptyTest() {
        assertEquals(0, service.All().size());
    }

    @Test(expected = Exception.class)
    public void exceptionOnInvalidInput() throws Exception {
        service.Insert(new BoxModel());
    }
}