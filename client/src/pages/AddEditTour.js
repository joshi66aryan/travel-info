import React ,{useState ,useEffect} from 'react';
import {MDBCard, MDBCardBody,MDBValidation, MDBBtn, MDBInput,MDBTextArea} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import {toast} from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { createTourAction, updateTourAction } from '../redux/features/tourSlice'

const initialState = {
    title : "",
    description: "",
    tags:[]
}
const AddEditTour = () => {
    const [tourData, setTourData] = useState(initialState);
    const {title, description, tags} = tourData;
    const [tagErrMsg, setTagErrMsg] = useState(null);
    const [titleErrMsg, setTitleErrMsg] = useState(null);
    const [desErrMsg, setDesErrMsg] = useState(null);
    const {userTours,error} = useSelector((state) => ({...state.tour}));
    const {user} = useSelector((state) => ({...state.auth}));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if(id){
            const singleTour = userTours.find((tour) => tour._id === id) 
            setTourData({...singleTour})
        }// eslint-disable-next-line 
    }, [id]);

    useEffect(() => {
        error && toast.error(error);
    }, [error]);
    
    const onInputChange = (e) => {
        const {name, value} = e.target
        setTourData({...tourData, [name]: value})
    }

    const handleAddTag = (tag) => {
        setTagErrMsg(null);
        setTourData({...tourData, tags: [...tourData.tags, tag]})
    }

    const handleDelete = (deleteTag) => {
        setTourData({...tourData, tags: tourData.tags.filter((tag) => tag !== deleteTag)})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!tags.length){
            setTagErrMsg("Please provide tags")
        }
        if(!title.length){
            setTitleErrMsg("Please provide title")
        }
    
        if(!description.length){
            setDesErrMsg("Please provide description")
        }
        if(title && description && tags){
            const updatedTourData = {...tourData,name:user?.result?.name};
            if(!id){
                dispatch(createTourAction({updatedTourData, navigate, toast}))
            } else {
                dispatch(updateTourAction({id,updatedTourData,toast, navigate }))
            }
        }
        handleClear();
    }

    const handleClear = () => {
        setTourData({title:"", description:"", tags:[]})
        setDesErrMsg(null);
        setTitleErrMsg(null);
    }

  return (
    <div 
        style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "450px",
            alignContent:"center",
            marginTop:"120px"
        }} 
        className= "container"
    >

        <MDBCard alignment = 'center'>

            <h5>{id?"Update Tour":"Add Tour"}</h5>

            <MDBCardBody>
                <MDBValidation onSubmit = {handleSubmit} className="row g-3" noValidate>
                    
                    <div className = "col-md-12">
                        <MDBInput 
                        placeholder = "Enter Title"
                        type = "text"
                        value={title || ""}
                        name="title"
                        onChange = {onInputChange}
                        className = 'form-control'
                        required
                        invallid
                        />
                        {titleErrMsg&& <div className="tagerrmsg" style={{color : "#f93154"}}>{titleErrMsg}</div>}
                    </div>
                    <div className = "col-md-12">
                        <MDBTextArea
                        placeholder = "Enter Description"
                        type = "text"
                        value={description}
                        name="description"
                        onChange = {onInputChange}
                        className = 'form-control'
                        required
                        rows ={ 4}
                        />
                        {desErrMsg&& <div className="tagerrmsg" style={{color : "#f93154"}}>{desErrMsg}</div>}
                    </div>
                    <div className = "col-md-12">
                        <ChipInput
                            name = "tags"
                            variant = "outlined"
                            placeholder = "Enter Tag"
                            fullWidth
                            value = {tags}
                            onAdd = {(tag) => handleAddTag(tag)}
                            onDelete = {(tag) => handleDelete(tag)}
                        />
                        {tagErrMsg && <div className="tagerrmsg" style={{color : "#f93154"}}>{tagErrMsg}</div>}
                    </div>
                    <div className =" d-flex justify-content-start">
                        <FileBase 
                            type="file" 
                            multiple = {false} 
                            onDone={
                                ({base64}) => setTourData({...tourData, imageFile: base64})
                            }
                        />
                    </div>
                    <div className = "col-12">
                        <MDBBtn style = {{width: "100%"}}>
                            {id? "Update" : "Submit"}
                        </MDBBtn>
                        <MDBBtn 
                            style = {{width: "100%"}} 
                            className="mt-2" 
                            color = "danger" 
                            onClick = { handleClear}
                        >
                            Clear
                        </MDBBtn>
                    </div>

                </MDBValidation>
            </MDBCardBody>
        </MDBCard>
    </div>
    
  )
};

export default AddEditTour;