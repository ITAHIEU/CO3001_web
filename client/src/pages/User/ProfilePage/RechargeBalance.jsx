import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RechargePage.module.css";

const RechargePage = () => {
    const [rechargeAmount, setRechargeAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleRecharge = async () => {
        if (rechargeAmount <= 0) {
            setErrorMessage("Số lượng trang phải lớn hơn 0.");
            return;
        }

        const rechargeData = {
            paymentMethod: "BKPay",
            pagesBought: rechargeAmount,
        };
        try {
            console.log(rechargeData);
            const response = await fetch(`http://localhost:5000/users/${user.id}/buy`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(rechargeData),
            });
            console.log(user.id)
            if (response.ok) {
                const result = await response.json();
                const updatedUser = { ...user, balance: result.newBalance };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                navigate("/profile-page");
            } else {
                const error = await response.json();
                setErrorMessage(error.message || "Nạp trang thất bại.");
            }
        } catch (error) {
            setErrorMessage("Đã xảy ra lỗi khi nạp trang.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>Nạp thêm trang in</h2>
                <div className={styles.inputGroup}>
                    <label>Số lượng trang:</label>
                    <input
                        type="number"
                        value={rechargeAmount}
                        onChange={(e) => setRechargeAmount(Number(e.target.value))}
                    />
                </div>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                <div className={styles.actions}>
                    <button onClick={handleRecharge}>Xác nhận</button>
                    <button onClick={() => navigate("/profile")}>Hủy</button>
                </div>
            </div>
        </div>
    );
};

export default RechargePage;
