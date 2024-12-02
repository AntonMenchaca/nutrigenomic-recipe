"use client";
import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Select, Button, Typography, Card, Spin, Upload, message, Image } from 'antd';
import '../styles/globals.css'
import { FileAddFilled, } from "@ant-design/icons";

const { Title, Text } = Typography;



const UploadData = ({ dietNeeds, setDietNeeds }) => {

  const [loaded, setLoaded] = useState(false);
  const [loadingDiet, setLoadingDiet] = useState(false)

  const alleleObj = {
    'Low-Fat': {
      'rs429358': 'C', // APOE, linked to E4 allele and high cholesterol
      'rs7412': 'C',   // APOE, linked to E4 allele
      'rs1801282': 'G', // PPARG, linked to impaired fat metabolism
      'rs9939609': 'A', // FTO, linked to obesity risk
      'rs17782313': 'C' // MC4R, linked to obesity risk
    },
    'Low-Sodium': {
      'rs4343': 'C',    // ACE, linked to salt sensitivity
      'rs699': 'T',     // AGT, linked to sodium sensitivity and high blood pressure
      'rs4961': 'G',    // ADD1, linked to salt-sensitive hypertension
      'rs239345': 'T'   // SCNN1B, linked to sodium retention
    },
    'Dairy-Free': {
      'rs4988235': 'C', // LCT, linked to lactose intolerance
      'rs182549': 'C',  // MCM6, linked to lactose intolerance
      'rs2187668': 'A', // HLA-DQ2, linked to celiac and dairy cross-reactivity
      'rs174546': 'T'   // FADS1, linked to omega-3/omega-6 fatty acid metabolism
    }
  };


  useEffect(() => {
    setLoaded(true)
  }, [])

  const handleFileUpload = (file) => {
    // Check file type
    if (file.type !== "text/plain") {
      message.error("You can only upload text files!");
      return false;
    }
    setDietNeeds([])
    setLoadingDiet(true)
    const reader = new FileReader();

    // Read the file content
    reader.onload = (e) => {
      const textContent = e.target.result;
      // Parse or process the text content
      // Example: Splitting lines and logging
      const lines = textContent.split("\n");
      const dietList = [];
      const keyAlleles = Object.keys(alleleObj);

      lines.forEach((line, index) => {
        keyAlleles.forEach((key) => {
          const variants = alleleObj[key]; // Get the object of variants and alleles for the category
          Object.entries(variants).forEach(([variant, allele]) => {
            // Match the exact variant and allele using word boundaries (\b)
            const variantRegex = new RegExp(`\\b${variant}\\b`);
            const alleleRegex = new RegExp(`\\b${allele}\\b`);

            if (variantRegex.test(line) && alleleRegex.test(line)) {
              dietList.push({
                category: key,
                line: line.trim(),
                variant: variant,
                allele: allele,
                lineIndex: index + 1, // Adding 1 to make it human-readable
              });
            }
          });
        });
      });

      // Log the collected matches
      setDietNeeds(dietList)
      setLoadingDiet(false)

    };

    reader.onerror = (e) => {
      message.error("Failed to read the file!");
    };

    // Read the file as text
    reader.readAsText(file);

    // Prevent automatic upload
    return false;
  };

  return (
    <Card
      title="Upload Raw Data"
      bordered={false}
      loading={!loaded}
      style={{ height: '100%', display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}

    >

      <Image preview={false} height={300} width={'100%'} alt='dna image' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4czK6tLjgaIlPC7a5C9vwS6XSsjPU1HqYIQ&s' />
      <div style={{ margin: '10px auto', height: '100%', width: '100%' }}>
        {loadingDiet && <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '15px auto' }}><Spin size='large' /></div>}
        {dietNeeds.length ? <div style={{ margin: '15px auto' }}>

          <Typography.Title level={5}>Dietary Considerations from DNA</Typography.Title>
          <ul key={'diet consideration'}>
            {dietNeeds.map((diet) => {
              return (
                <li key={dietNeeds.variant + diet.allele}>{diet.variant}-{diet.allele} : {diet.category}</li>
              )
            })}
          </ul>
        </div> : <></>}
        <Upload.Dragger

          beforeUpload={handleFileUpload}
          showUploadList={false} // Hide default upload list
        >
          <Button icon={<FileAddFilled />}>Upload DNA Data</Button>
        </Upload.Dragger>

      </div>

    </Card>
  )
}



export default UploadData;
