import React ,{useEffect} from 'react';
import { MDBCardBody, MDBCard, MDBCardText, MDBCardImage, MDBContainer, MDBIcon, MDBBtn} from "mdb-react-ui-kit";
import {useParams,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import { getTourAction } from '../redux/features/tourSlice';


const SingleTour = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {tour} = useSelector((state) => ({...state.tour}));
  const {id} = useParams();

  useEffect(() => {
    if(id){
      dispatch(getTourAction(id));
    }// eslint-disable-next-line
  },[id])

  return (
    
    <>
      <MDBContainer>
        <MDBCard className = "mb-3 mt-4">
          <MDBCardImage
            position='top'
            style={{width: "100%", maxHeight: "600px"}}
            src = {tour.imageFile}
            alt={tour.title}
          />
          <MDBCardBody>
            <MDBBtn 
              tag="a" 
              color="none" 
              style = {{float:"left" , color:"#000"}} 
              onClick={() => navigate("/")}
            >
              <MDBIcon 
                fas 
                size="lg" 
                icon ="long-arrow-alt-left"
                style={{float: "left"}}
              />
            </MDBBtn>

            <h3>{tour.title}</h3>
            <span>
              <p className="text-start tour_name"> Created By: {tour.name}</p>
            </span>
            <div style={{float:" left"}}>
              <span className="text-start">
                {tour&&tour.tags&&tour.tags.map((item) =>`#${item}`)}
              </span>
            </div>
            <br/>

            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{float:'left', margin:'5px'}}
                far
                icon="calendar"
              />
              <small className="text-muted">
                {moment(tour.createdAt).fromNow()}
              </small>
            </MDBCardText>

            <MDBCardText className="lead mb-0 text-start">
              {tour.description}
            </MDBCardText>

          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  )
}

export default SingleTour;