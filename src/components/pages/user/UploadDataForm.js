import React, { useState } from 'react';

const UploadDataForm = () => {
    const ApiEndPointUrl = "https://script.google.com/macros/s/AKfycbyYax6S5KFFHxkC0y1PNnzm7HyNzz2aoapXW71dKRMPjJwpeq44wjEkb0hzaCCwujj6/exec";
    const [imageUrl, setImageUrl] = useState('');
    const [file, setFile] = useState(null);

    const handleChangeImage = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (file) {
            const base64 = imageUrl.split("base64,")[1];
            const formData = new FormData(e.target);
            const LeaveType = formData.get('LeaveType');
            const DetailLeave = formData.get('DetailLeave');

            const obj = {
                base64: base64,
                type: file.type,
                name: file.name,
                LeaveType: LeaveType,
                DetailLeave: DetailLeave,

            };

            fetch(ApiEndPointUrl, {
                method: "POST",
                body: JSON.stringify(obj)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(data => {
                    console.log(data);
                    // Handle success response here
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle error here
                });
        } else {
            console.log("No file selected");
        }
    };

    return (
        <form className='LeavePage' onSubmit={handleSubmit}>
            <div className='LeaveForm'>
                <div className='container'>
                    <div className='box'>
                        <h1>ข้อมูลการลา</h1>
                        <div className='input-form'>
                            <div className='wrap-leave'>
                                <div className='inputgroup'>
                                    <div className='input-box'>
                                        <label htmlFor="LeaveType">ประเภท</label>
                                        <div className='input-Login'>
                                            <select
                                                id="LeaveType"
                                                className=""
                                                name='LeaveType'

                                            >
                                                <option value="ลากิจ">ลากิจ</option>
                                                <option value="ลาป่วย">ลาป่วย</option>
                                                <option value="ลาคลอด">ลาคลอด</option>
                                                <option value="ลาเข้ารับตรวจเลือกทหาร">
                                                    ลาเข้ารับตรวจเลือกทหาร
                                                </option>
                                                <option value="ลาประกอบพิธีทางศาสนา">
                                                    ลาประกอบพิธีทางศาสนา
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='wrap bottom'>
                                <div className='inputgroup bottom-form'>
                                    <div className='input-box'>
                                        <label>รายละเอียด</label><br />
                                        <div className='input-Login'>
                                            <input type='text' name='DetailLeave' placeholder='รายละเอียดการลา' />
                                        </div>

                                    </div>
                                    <div className='input-box'>
                                        <label>หลักฐาน</label><br />
                                        <div className='input-Login'>
                                            <input
                                                type='file'
                                                name='Evidence'
                                                placeholder='รูปหลักฐานการลา'
                                                onChange={handleChangeImage} // เพิ่ม onChange event listener
                                            />
                                        </div>

                                    </div>



                                </div>

                            </div>
                        </div>

                        <button type='submit' className='submit'>ส่งคำร้อง</button>
                    </div>

                </div>
            </div>

        </form>
    );
};

export default UploadDataForm;
