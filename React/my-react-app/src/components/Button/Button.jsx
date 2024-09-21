// import styles from './Button.module.css'

function Button(){

    const styles = {
        backgroundColor: "lightskyblue",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
    }
    return(
        <button style={styles}>Click Me</button>
    );
}

export default Button;