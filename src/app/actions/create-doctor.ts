"use server";
import { db } from "@/db";
import { DoctorAvailability } from "@prisma/client";
import { createDoctorValidator } from "@/lib/validators/db-doctor-validator";

export async function createDoctor(
  userId: string,
  doctorId: string,
  doctorName: string,
  doctorSpeciality: string,
  doctorAvailability: { dayOfWeek: number; startTime: string; endTime: string }
) {
  try {
    // Validate input data
    const validatedData = createDoctorValidator.parse({
      userId,
      doctorId,
      doctorName,
      doctorSpeciality,
      doctorAvailability,
    });

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: {
        id: validatedData.userId,
      },
    });

    if (!existingUser) {
      return {
        error: "User not found",
        status: 404,
      };
    }

    // Create new doctor with dummy availability.
    const newDoctor = await db.doctor.create({
      data: {
        userId: validatedData.userId,
        id: validatedData.doctorId,
        name: validatedData.doctorName,
        speciality: validatedData.doctorSpeciality,
        availability: {
          create: validatedData.doctorAvailability,
        },
      },
      select: {
        id: true,
      },
    });

    return {
      success: "Doctor created successfully",
      status: 201,
      doctor: newDoctor.id,
    };
  } catch (error) {
    console.error("Error creating doctor:", error);
    return {
      error: "Failed to create doctor",
      status: 500,
    };
  }
}
