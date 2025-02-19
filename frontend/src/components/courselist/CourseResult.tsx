// import styles from "./courselist.module.css";

const CourseResult: React.FC<{id: string, name: string}> = ({id, name}) => {

  return (
    <div>
        <p><strong>{id}</strong><br/>{name}</p>

    </div>
  );
}

export default CourseResult;
