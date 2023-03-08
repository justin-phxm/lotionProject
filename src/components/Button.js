import { React} from "react";
// import formattedDate from "././Layout.js";
import { useNavigate } from "react-router-dom";

function Button({info}){
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        };
    function formattedDate(when){
        when = new Date(when)
        return(when.toLocaleString("en-US", options))
    }
    var buttonCount = info.buttonCount
    var buttonTitle = info.buttonTitle
    var buttonDate = formattedDate(info.buttonDate)
    var buttonContent = info.buttonContent

    var buttonID = "title" + buttonCount
    var separatorID = buttonCount + "separator"

    const navigate = useNavigate();
    return(
        <div>
            <button onClick={() => navigate(`/notes/${buttonCount}`)} id={buttonID} class="focus:bg-slate-600 focus:text-white hover:bg-slate-500 w-full p-2">
                <div class="font-bold text-xl float-left">{buttonTitle}</div>
                <div class="text-sm text-neutral-500 text-light float-left">{buttonDate}</div>
                <div class="float-left">{buttonContent}</div>
            </button>
            <div class="h-px bg-slate-100" id={separatorID}/>
        </div>
    )
}
export default Button;
