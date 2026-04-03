export default function Register() {

// const [isLoggedIn, setIsLoggedIn] = useState(false);

const handleLogin = () => {
        


    return (
        <div>
            <h1>Register</h1>
            <div>
                <form>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

}