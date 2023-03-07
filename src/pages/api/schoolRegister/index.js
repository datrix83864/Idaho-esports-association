import prisma from '../../../lib/prisma'
import { v4 as uuidv4 } from 'uuid';

const uuidBuffer = require('uuid-buffer');

export default async function handle(req, res) {
  const { name, address_1, address_2, city, zip, mascot, logo } = req.body;
  const result = await prisma.school.create({
      data: {
          school_uid_binary: uuidBuffer.toBuffer(uuidv4()),
          name: name,
          address_1: address_1,
          address_2: address_2,
          city: city,
          zip: zip,
          mascot: mascot,
          logo: logo,
      },
      
  });
}