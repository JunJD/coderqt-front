import React, { useEffect, useState } from 'react';
import { ColorTypes, PDFDocument } from 'pdf-lib';

function UploadResume() {
    const [pdfBytes, setPdfBytes] = useState<BlobPart>();
    useEffect(() => {
        createForm();
    }, []);
    async function createForm() {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([550, 750]);
        const form = pdfDoc.getForm();

        page.drawText('Enter your favorite superhero:', {
            x: 50,
            y: 700,
            size: 20,
        });
        const superheroField = form.createTextField('favorite.superhero');
        superheroField.setText('One Punch Man');
        // 设置字段的位置
        superheroField.addToPage(page, {
            x: 55,
            y: 640,
            width: 500,
            height: 25,
        });
        // 设置字段的大小
        page.drawText('Select your favorite rocket:', {
            // 设置文本的样式，简历中的文本样式
            x: 50,
            y: 600,
            size: 20,
            // 设置文本的颜色,这个颜色是：红色
            color: {
                type: ColorTypes.RGB,
                red: 0.9,
                green: 0.1,
                blue: 0.1,
            },
            // 设置文本的字体
            wordBreaks: [' Helvetica-Bold '],
        });

        setPdfBytes(await pdfDoc.save());
    }

    const exportPdf = () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const blob = new Blob([pdfBytes!], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'form.pdf';
        link.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 使用pdf-lib解析PDF
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = () => {
                const typedArray = new Uint8Array(reader.result as ArrayBuffer);
                PDFDocument.load(typedArray).then((pdfDoc) => {
                    // 获取表单
                    const form = pdfDoc.getForm();
                    // 获取表单中的字段
                    const fields = form
                        .getFields()
                        .map((field) => field.getName());
                    // 获取表单中的值
                    const values = fields.map((field) => {
                        const value = form.getTextField(field)?.getText();
                        return value;
                    });
                    console.log('values=>', values);
                });
            };
        }
    };

    return (
        <div>
            <h1>PDF Editor</h1>
            <button onClick={exportPdf}>Export PDF</button>
            {/* 解析PDF */}
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
            />
        </div>
    );
}

export default UploadResume;
