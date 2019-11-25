package se.boxinator.api;

import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.*;

import org.springframework.test.context.junit4.SpringRunner;

import junit.framework.Assert;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
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
    public void defaultEmptyTest() throws Exception {
        assertEquals(0, service.All().size());
    }

    @Test(expected = Exception.class)
    public void exceptionOnInvalidInput() throws Exception {
        service.Insert(new BoxModel());
    }


    @Test
    @DirtiesContext
    public void validInputNoException() throws Exception {
        service.Insert(new BoxModel() {{
            recipient_name = "recipient1";
            destination_country = "sweden";
            color = "#ffffff";
            weight = 7.1f;
        }});
    }

    @Test
    @DirtiesContext
    public void computesShippingCost() throws Exception {
        BoxModel created = service.Insert(new BoxModel() {{
            recipient_name = "recipient1";
            destination_country = "sweden";
            color = "#ffffff";
            weight = 7.1f;
        }});
        assertTrue(created.shipping_cost > 0);
    }


    @Test(expected = Exception.class)
    public void exceptionOnInvalidDestinationCountry() throws Exception {
        service.ComputeShippingCost(new BoxModel() {{ destination_country = "invalid"; }});
    }

    @Test
    public void noExceptionOnValidCountry() throws Exception {
        service.ComputeShippingCost(new BoxModel() {{ destination_country = "sweden"; }});
    }
}