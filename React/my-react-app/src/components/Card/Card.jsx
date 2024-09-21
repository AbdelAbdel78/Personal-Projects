import styles from "./Card.module.css"
import headshot from "./Headshot_Abdel.jpg"

function Card() {
    return(
        <div className={styles.card}>
            <img className ={styles.cardImage} src={headshot} alt="Headshot of myself"></img>
            <h2 className ={styles.cardTitle}>Abdel Abdelgawad</h2>
            <p className={styles.cardText}>Hello! I am a recent computer science graduate who loves to fence.</p>
        </div>
    );
}

export default Card