import "./typeng.css"

function Typeng(props) {
    return (


        <div className="loaderTypeng mt-2">
            {/* eslint-disable-next-line react/prop-types */}
            <span className="mx-3 text-lg">{props.userName}</span>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
        </div>


    );
}

export default Typeng;